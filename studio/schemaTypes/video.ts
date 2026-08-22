import {defineArrayMember, defineField, defineType} from 'sanity'
import {VideoIcon} from '@sanity/icons'

export const video = defineType({
  name: 'video',
  title: 'Video',
  type: 'document',
  icon: VideoIcon,
  description:
    'Internal lookup for transcript and chapters, keyed by an id derived from the video URL. One document per unique video URL. Never shown as a search result directly.',
  fields: [
    defineField({
      name: 'url',
      title: 'Video URL',
      type: 'url',
      description: 'Canonical video URL (YouTube, Vimeo, Bunny)',
      validation: (rule) => rule.uri({scheme: ['http', 'https']}).required(),
    }),
    defineField({
      name: 'chapters',
      title: 'Chapters (Table of Contents)',
      type: 'array',
      of: [defineArrayMember({type: 'chapter'})],
      description: 'Source chapter markers or authored TOC',
    }),
    defineField({
      name: 'chunks',
      title: 'Transcript Chunks',
      type: 'array',
      of: [defineArrayMember({type: 'transcriptChunk'})],
      description: 'Transcript split into short timestamped pieces. Keep the whole transcript out of any single field.',
    }),
  ],
  preview: {
    select: {title: 'url'},
  },
})
