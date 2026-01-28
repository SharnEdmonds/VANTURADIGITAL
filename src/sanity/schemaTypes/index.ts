import { type SchemaTypeDefinition } from 'sanity'

import {blockContentType} from './blockContentType'
import {categoryType} from './categoryType'
import {postType} from './postType'
import {authorType} from './authorType'
import {projectType} from './projectType'

// Vantura Digital content schemas
import { service } from '../../../sanity/schemas/service'
import { brandIdentity, valueProposition, siteSettings } from '../../../sanity/schemas/brand'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    // Vantura content types
    service,
    brandIdentity,
    valueProposition,
    siteSettings,
    // Blog content types
    blockContentType,
    categoryType,
    postType,
    authorType,
    // Portfolio
    projectType,
  ],
}
