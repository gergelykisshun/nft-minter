import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'collection',
  title: 'Collection',
  type: 'document',
  fields: [
    defineField({
      name: 'mintable',
      title: 'Mintable',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'title',
      description: 'Enter the title of the NFT drop',
      title: 'Title',
      type: 'string',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'string',
    }),
    defineField({
      name: 'nftCollectionName',
      title: 'Name of NFT Collection',
      type: 'string',
    }),
    defineField({
      name: 'address',
      title: 'Address',
      type: 'string',
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
    }),
    defineField({
      name: 'creator',
      title: 'Creator',
      type: 'reference',
      // name to the creator schema
      to: {type: 'creator'},
    }),
    defineField({
      name: 'mainImage',
      title: 'Main image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'previewImage',
      title: 'Preview image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
  ],
})
