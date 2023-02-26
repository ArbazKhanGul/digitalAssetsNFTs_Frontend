

const Meta=()=>{

    return(
        <>
        <meta property="og:type" content="website" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta property="og:url"  content={`https:/textnft.vercel.app/individualnft`} />
        <meta property="fb:app_id" content="966242223397117" />
        {/* <meta property="url"  content={`https://textnft.vercel.app/individualnft`} /> */}
        <meta property="description"  content="If you continue work hard success will follow you..." />
        <meta property="og:description"  content="If you continue work hard success will follow you so try hard...." /> 
       {/* <meta property="title" content="Sports NFTs" /> */}
        <meta property="og:title" content="Sports NFTs" />
        <meta property="og:site_name" content="Golden Words Nfts" />
        {/* <meta property="og:site_name" content="my_website_name" /> */}
        <meta property="image" content="https://textnft.vercel.app/newer.png" />
        <meta property="og:image"  content="https://textnft.vercel.app/newer.png" />
        <meta property="og:image:type" content="image/png" />
        {/* <meta property="og:image:secure_url" content="https://textnft.vercel.app/new.png" /> */}
        <meta property="og:image:width" content="270" />
        <meta property="og:image:height" content="270" />
        {/* <meta property="image:width" content="467" /> */}
        {/* <meta property="image:height" content="88" /> */}


{/* twitter */}


        <meta
          property="twitter:url"
          content={`https:/textnft.vercel.app/individualnft`}
        />
        <meta
          property="twitter:description"
          content="If you continue work hard success will follow you so try hard...."
          key="og-desc"
        />
        <meta property="twitter:title" content="Sports NFTs" />
        <meta
          property="twitter:image"
          itemProp="image"
          content="https://textnft.vercel.app/newer.png"
        />
        <meta name="twitter:card" content="summary_large_image"/>
        </>
    )
}

export default Meta;