import type { Schema, Struct } from '@strapi/strapi';

export interface SharedButton extends Struct.ComponentSchema {
  collectionName: 'components_shared_buttons';
  info: {
    description: '';
    displayName: 'Button';
    icon: 'cursor';
  };
  attributes: {
    text: Schema.Attribute.String;
    URL: Schema.Attribute.String;
    variant: Schema.Attribute.Enumeration<
      ['simple', 'outline', 'primary', 'muted']
    > &
      Schema.Attribute.DefaultTo<'primary'>;
  };
}

export interface SharedImageParagraph extends Struct.ComponentSchema {
  collectionName: 'components_shared_image_paragraphs';
  info: {
    description: '';
    displayName: 'Image_Paragraph';
  };
  attributes: {
    CTAs: Schema.Attribute.Component<'shared.button', true>;
    direction: Schema.Attribute.Enumeration<
      ['img-on-left', 'img-on-right', 'img-on-top', 'img-on-bottom']
    >;
    display: Schema.Attribute.Enumeration<['tile', 'carousel']>;
    images: Schema.Attribute.Media<
      'images' | 'files' | 'videos' | 'audios',
      true
    >;
    paragraphs: Schema.Attribute.Component<'shared.paragraph', true>;
  };
}

export interface SharedLink extends Struct.ComponentSchema {
  collectionName: 'components_shared_links';
  info: {
    displayName: 'Link';
    icon: 'link';
  };
  attributes: {
    target: Schema.Attribute.Enumeration<
      ['_blank', '_self', '_parent', '_top']
    >;
    text: Schema.Attribute.String;
    URL: Schema.Attribute.String;
  };
}

export interface SharedParagraph extends Struct.ComponentSchema {
  collectionName: 'components_shared_paragraphs';
  info: {
    description: '';
    displayName: 'Paragraph';
  };
  attributes: {
    text: Schema.Attribute.RichText;
    title: Schema.Attribute.String;
  };
}

export interface SharedParagraphStory extends Struct.ComponentSchema {
  collectionName: 'components_shared_paragraph_stories';
  info: {
    description: '';
    displayName: 'Paragraph_Story';
  };
  attributes: {
    badges: Schema.Attribute.Media<
      'images' | 'files' | 'videos' | 'audios',
      true
    >;
    sections: Schema.Attribute.Component<'shared.image-paragraph', true>;
    subtitle: Schema.Attribute.String;
    title: Schema.Attribute.String;
  };
}

export interface SharedSeo extends Struct.ComponentSchema {
  collectionName: 'components_shared_seos';
  info: {
    displayName: 'seo';
    icon: 'search';
  };
  attributes: {
    canonicalURL: Schema.Attribute.String;
    keywords: Schema.Attribute.Text;
    metaDescription: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 50;
      }>;
    metaImage: Schema.Attribute.Media<'images' | 'files' | 'videos'>;
    metaRobots: Schema.Attribute.String;
    metaTitle: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 60;
      }>;
    metaViewport: Schema.Attribute.String;
    structuredData: Schema.Attribute.JSON;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'shared.button': SharedButton;
      'shared.image-paragraph': SharedImageParagraph;
      'shared.link': SharedLink;
      'shared.paragraph': SharedParagraph;
      'shared.paragraph-story': SharedParagraphStory;
      'shared.seo': SharedSeo;
    }
  }
}
