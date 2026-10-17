import mql from '@microlink/mql';
import { writeClient } from '@/lib/sanity/client';
import { SNAPSHOT_URL_QUERY } from '@/lib/sanity/queries';

type SnapshotDoc = {
    _id: string;
    url: string;
    currentAssetId?: string;
    previousAssetId?: string;
};

function isAuthorized(request: Request): boolean {
    const secret = process.env.CRON_SECRET;
    return !!secret && request.headers.get('authorization') === `Bearer ${secret}`;
}

const assetRef = (assetId: string) => ({
    _type: 'image',
    asset: { _type: 'reference', _ref: assetId },
});

async function refreshSnapshot({ _id, url, currentAssetId, previousAssetId }: SnapshotDoc) {
    const { data } = await mql(url, { screenshot: true });
    const screenshotUrl = data.screenshot?.url;
    if (!screenshotUrl) throw new Error(`Brak screenshotu dla ${url}`);

    const image = await fetch(screenshotUrl);
    if (!image.ok) throw new Error(`Pobranie screenshotu nie powiodło się (${image.status}) dla ${url}`);

    const asset = await writeClient.assets.upload(
        'image',
        Buffer.from(await image.arrayBuffer()),
        { filename: `snapshot-${_id}.png` }
    );

    // Obecny zrzut przesuwa się na "previous"; identyczny plik daje to samo asset._id.
    const patch = writeClient.patch(_id).set({ screenshot: assetRef(asset._id) });
    await (currentAssetId && currentAssetId !== asset._id
        ? patch.set({ previousScreenshot: assetRef(currentAssetId) })
        : patch
    ).commit();

    // Najstarszy zrzut nie jest już przez nic używany, więc można go usunąć.
    const staleAssetId = previousAssetId;
    const stillUsed = [asset._id, currentAssetId].includes(staleAssetId);
    if (staleAssetId && !stillUsed) await writeClient.delete(staleAssetId);

    return { _id, url };
}

export async function GET(request: Request) {
    if (!isAuthorized(request)) return new Response('Unauthorized', { status: 401 });

    const docs: SnapshotDoc[] = await writeClient.fetch(SNAPSHOT_URL_QUERY);
    const results = await Promise.allSettled(docs.map(refreshSnapshot));

    const updated = results.flatMap((result) => (result.status === 'fulfilled' ? [result.value] : []));
    const failed = results.flatMap((result) => (result.status === 'rejected' ? [String(result.reason)] : []));

    return Response.json({ updated, failed });
}
