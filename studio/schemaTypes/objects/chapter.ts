import {defineField, defineType} from 'sanity'

export const chapter = defineType({
  name: 'chapter',
  title: 'Chapter',
  type: 'object',
  fields: [
    defineField({
      name: 'startSeconds',
      title: 'Start (seconds)',
      type: 'number',
      validation: (rule) => rule.required().min(0),
    }),
    defineField({
      name: 'label',
      title: 'Label',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: {title: 'label', subtitle: 'startSeconds'},
    prepare({title, subtitle}) {
      return {title, subtitle: typeof subtitle === 'number' ? `${subtitle}s` : subtitle}
    },
  },
})
