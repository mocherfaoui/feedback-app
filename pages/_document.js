import Document, { Head, Html, Main, NextScript } from 'next/document';
import { CssBaseline } from '@geist-ui/core';

import { getCssText } from '../stitches.config.js';

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    const styles = CssBaseline.flush();
    return {
      ...initialProps,
      styles: (
        <>
          {initialProps.styles}
          {styles}
        </>
      ),
    };
  }

  render() {
    return (
      <Html>
        <Head>
          <style
            id="stitches"
            dangerouslySetInnerHTML={{ __html: getCssText() }}
          />
          <script
            async
            defer
            data-website-id="89efe7c0-8da1-4cc6-a24a-3d80f2a18197"
            src="https://umami.cherfaoui.dev/umami.js"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
