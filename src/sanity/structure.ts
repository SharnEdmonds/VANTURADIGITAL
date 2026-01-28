import type {StructureResolver} from 'sanity/structure'

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = (S) =>
  S.list()
    .title('Vantura Digital')
    .items([
      // Site-wide settings (singleton)
      S.listItem()
        .title('Site Settings')
        .id('siteSettings')
        .child(
          S.document()
            .schemaType('siteSettings')
            .documentId('siteSettings')
        ),
      S.divider(),
      // Vantura content types
      S.documentTypeListItem('service').title('Services'),
      S.documentTypeListItem('project').title('Projects'),
      S.documentTypeListItem('brandIdentity').title('Brand Identity'),
      S.documentTypeListItem('valueProposition').title('Value Proposition'),
      S.divider(),
      // Blog content types
      S.documentTypeListItem('post').title('Posts'),
      S.documentTypeListItem('category').title('Categories'),
      S.documentTypeListItem('author').title('Authors'),
    ])
