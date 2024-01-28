

const Meta=({nftData,contentData}) => {

    return(
        <>
        <meta property="og:url"  content={`https://dgitalassets.vercel.app/individualnft/${nftData?.tokenURI}`} />
        <meta property="og:type" content="website" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta property="fb:app_id" content="966242223397117" />
        <meta property="og:title" content={nftData?.nftName} />
        <meta property="og:site_name" content="Digital Assets Nfts" />


       {contentData.type=="text" && <>
        <meta property="description"  content={`${contentData?.title}`}/>
        <meta property="og:description"  content={`${contentData?.title}`} /> 
        <meta property="image" content={`https://dgitalassets.vercel.app/social_s.png`} />
        <meta property="og:image"  content={`https://dgitalassets.vercel.app/social_s.png`} />
        </>
       }


       { contentData.type=="image" && <>
        <meta property="description"  content={`${contentData?.description}`}/>
        <meta property="og:description"  content={`${contentData?.description}`} /> 
        <meta property="image" content={`${process.env.ipfsURL}${contentData?.content}`} />
        <meta property="og:image"  content={`${process.env.ipfsURL}${contentData?.content}`} />
        {/* <meta property="og:image:type" content="image/png" /> */}
        </>
       }


       {contentData.type=="video" || contentData.type=="audio" ? <>
       <meta property="description"  content={`${contentData?.decription}`}/>
        <meta property="og:description"  content={`${contentData?.description}`} /> 
        <meta property="image" content={`https://dgitalassets.vercel.app/social_s.png`} />
        <meta property="og:image"  content={`https://dgitalassets.vercel.app/social_s.png`} />
        </>:null
       }


{/* twitter */}


        <meta
          property="twitter:url"
          content={`https://dgitalassets.vercel.app/individualnft/${nftData?.tokenURI}`}
        />
        <meta property="twitter:title" 
        content={nftData?.nftName} />


      {contentData.type=="text" && <>
        <meta
          property="twitter:description"
          content={contentData?.title}
          key="og-desc"
        />
        <meta
          property="twitter:image"
          itemProp="image"
          content={`https://dgitalassets.vercel.app/social_s.png`}
        />
      </>}



       {contentData.type=="image" && <>
        <meta
          property="twitter:description"
          content={contentData?.description}
          key="og-desc"
        />
        <meta
          property="twitter:image"
          itemProp="image"
          content={`https://goldenwords.infura-ipfs.io/ipfs/${contentData?.content}`}
        />
        </>}


        {contentData.type=="text" && <>
        <meta
          property="twitter:description"
          content={nftData?.decription
          }
          key="og-desc"
        />
        <meta
          property="twitter:image"
          itemProp="image"
          content={`https://dgitalassets.vercel.app/social_s.png`}
        />
      </>}

        </>
    )
}

export default Meta;