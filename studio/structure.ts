import {BookIcon} from '@sanity/icons'
import {PlayIcon} from '@sanity/icons'
import {TagIcon} from '@sanity/icons'
import {UserIcon} from '@sanity/icons'
import {VideoIcon} from '@sanity/icons'
import type {StructureResolver} from 'sanity/structure'

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Glint Content')
    .items([
      S.listItem()
        .title('Courses')
        .icon(BookIcon)
        .child(S.documentTypeList('course').title('Courses')),
      S.listItem()
        .title('Lessons')
        .icon(PlayIcon)
        .child(S.documentTypeList('lesson').title('Lessons')),
      S.listItem()
        .title('Instructors')
        .icon(UserIcon)
        .child(S.documentTypeList('instructor').title('Instructors')),
      S.listItem()
        .title('Categories')
        .icon(TagIcon)
        .child(S.documentTypeList('category').title('Categories')),
      S.divider(),
      S.listItem()
        .title('Video Index (internal)')
        .icon(VideoIcon)
        .child(S.documentTypeList('video').title('Video Documents')),
      // Fallback for any other types
      ...S.documentTypeListItems().filter(
        (item) => !['course', 'lesson', 'instructor', 'category', 'video'].includes(item.getId() as string),
      ),
    ])
