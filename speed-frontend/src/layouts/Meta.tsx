import Head from 'next/head'

import { NextSeo } from 'next-seo'
import { AppConfig } from '@/utils/AppConfig'
import { IMetaProps } from '@/types'

const Meta = (props: IMetaProps) => {
  return (
    <>
      <Head>
        <meta charSet="UTF-8" key="charset" />
        <meta name="viewport" content="width=device-width,initial-scale=1" key="viewport" />
        <meta name="google-site-verification" content="TGWzp3heWpGCTwzfNF2RS9uP1mukAB0vC57oq2nnWZc" />
      </Head>
      <NextSeo
        title={props.title}
        description={props.description}
        canonical={props.canonical}
        openGraph={{
          title: props.title,
          description: props.description,
          url: props.canonical,
          locale: AppConfig.locale,
          site_name: AppConfig.site_name,
        }}
      />
    </>
  )
}

export { Meta }
