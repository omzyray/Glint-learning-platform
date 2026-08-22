import {defineField, defineType} from 'sanity'

export const learningOutcome = defineType({
  name: 'learningOutcome',
  title: 'Learning Outcome',
  type: 'object',
  fields: [
    defineField({
      name: 'icon',
      title: 'Icon',
      type: 'string',
      description: 'Icon identifier (e.g. lucide name) shown in the "What you will learn" section',
      options: {
        list: [
          {title: 'Code', value: 'code'},
          {title: 'Layers', value: 'layers'},
          {title: 'Rocket', value: 'rocket'},
          {title: 'Zap', value: 'zap'},
          {title: 'Book Open', value: 'book-open'},
          {title: 'Globe', value: 'globe'},
          {title: 'Award', value: 'award'},
          {title: 'Lightbulb', value: 'lightbulb'},
          {title: 'Target', value: 'target'},
        ],
      },
    }),
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 2,
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: {title: 'title', subtitle: 'description'},
  },
})
