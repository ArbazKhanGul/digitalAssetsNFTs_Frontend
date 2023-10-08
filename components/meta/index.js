

const Meta=({nftData,contentData}) => {
  console.log("🚀 ~ file: index.js:4 ~ Meta ~ nftData", nftData)
 
    return(
        <>
        <meta property="og:type" content="website" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta property="og:url"  content={`https://dgitalassets.vercel.app/individualnft/${nftData?.tokenURI}`} />
        <meta property="fb:app_id" content="966242223397117" />
        <meta property="og:title" content={nftData?.nftName} />
        <meta property="og:site_name" content="Digital Assets Nfts" />


      {contentData.type=="image" && <>
        <meta property="description"  content={`${contentData?.description}`}/>
        <meta property="og:description"  content={`${contentData?.description}`} /> 
        <meta property="image" content={`${process.env.ipfsURL}${contentData?.content}`} />
        <meta property="og:image"  content={`${process.env.ipfsURL}${contentData?.content}`} />
        {/* <meta property="og:image:type" content="image/png" /> */}
        </>
       }


       {contentData.type=="video" && 
       <>
<meta property="og:url" content="http://www.youtube.com/watch?v=CFLGRidfF04"/>
<meta property="og:title" content="Vanilla Ice Ninja Rap - Go Ninja, Go Ninja Go!"/>
<meta property="og:description" content="Ninja Rap music video by Vanilla Ice from Teenage Mutant Ninja Turtles 2 movie back in '91. Classic."/>
<meta property="og:type" content="video"/>
<meta property="og:image" content={`https://dgitalassets.vercel.app/newer.png`}/>
<meta property="og:video" content="http://www.youtube.com/v/GFLGRidF04?version=3&autohide=1"/>
<meta property="og:video:type" content="application/x-shockwave-flash"/>
<meta property="og:video:width" content="398"/>
<meta property="og:video:height" content="264"/>
<meta property="og:site_name" content="YouTube"/>
        </>
       }







        {/* <meta property="og:image:secure_url" content="https://textnft.vercel.app/new.png" /> */}
        {/* <meta property="og:image:width" content="270" /> */}
        {/* <meta property="og:image:height" content="270" /> */}
        {/* <meta property="image:width" content="467" /> */}
        {/* <meta property="image:height" content="88" /> */}


{/* twitter */}


        <meta
          property="twitter:url"
          content={`https:/textnft.vercel.app/individualnft/${nftData?.tokenURI}`}
        />
        <meta
          property="twitter:description"
          content={nftData?.title}
          key="og-desc"
        />
        <meta property="twitter:title" 
        content={nftData?.nftName} />
        <meta
          property="twitter:image"
          itemProp="image"
          content="https://textnft.vercel.app/newer.png"
        />
        {/* <meta name="twitter:card" content="summary_large_image"/> */}
        </>
    )
}

export default Meta;