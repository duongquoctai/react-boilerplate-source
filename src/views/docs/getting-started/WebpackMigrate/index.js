import React from 'react';
import Page from '~/components/Page';
import ReadMdFile from '~/components/ReadMdFile';
import content from './content.md';

// ----------------------------------------------------------------------

export default function WebpackMigrate() {
  return (
    <Page title="Webpack Migrate">
      <ReadMdFile content={content} />
    </Page>
  );
}
