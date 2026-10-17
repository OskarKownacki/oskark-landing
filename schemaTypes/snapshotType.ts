import { defineField, defineType } from 'sanity'
export const snapshotType = defineType({
    title: 'Snapshot',
    name: 'snapshot',
    type: 'document',
    preview: { select: { title: 'title.0.value', subtitle: 'eyebrow.0.value', media: 'screenshot' } },
    fields: [
        defineField({
            title: 'Title',
            name: 'title',
            type: 'internationalizedArrayString',
        }),
        defineField({
            title: 'Eyebrow',
            name: 'eyebrow',
            type: 'internationalizedArrayString',
        }),
        defineField({
            title: 'Body',
            name: 'body',
            type: 'internationalizedArrayText',
        }),
        defineField({
            title: 'Status',
            name: 'status',
            type: 'internationalizedArrayText',
        }),
        defineField({
            title: 'RepoURL',
            name: 'repoURL',
            type: 'url',
        }),
        defineField({
            title: 'URL',
            name: 'url',
            type: 'url',
        }),
        defineField({
            title: 'Tags',
            name: 'tags',
            type: 'array',
            of: [{ type: 'string' }],
        }),
        defineField({
            title: 'Screenshot',
            name: 'screenshot',
            type: 'image',
        }),
        defineField({
            title: 'Previous screenshot',
            name: 'previousScreenshot',
            type: 'image',
            readOnly: true,
        })
    ],
})