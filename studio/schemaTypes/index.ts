import {type SchemaTypeDefinition} from 'sanity'

import {category} from './category'
import {course} from './course'
import {instructor} from './instructor'
import {lesson} from './lesson'
import {video} from './video'
import {chapter} from './objects/chapter'
import {learningOutcome} from './objects/learningOutcome'
import {courseModule} from './objects/module'
import {resource} from './objects/resource'
import {transcriptChunk} from './objects/transcriptChunk'

export const schema: {types: SchemaTypeDefinition[]} = {
  types: [
    // Documents
    course,
    lesson,
    instructor,
    category,
    video,
    // Objects (must be registered)
    courseModule,
    learningOutcome,
    resource,
    chapter,
    transcriptChunk,
  ],
}
