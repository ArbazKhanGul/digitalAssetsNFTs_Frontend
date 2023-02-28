

const Meta=({data}) => {

      return(
          <>
          <meta property="og:type" content="website" />
          <meta name="viewport" content="initial-scale=1.0, width=device-width" />
          <meta property="og:url"  content={`http://localhost:3000/profile/${data._id}`} />
          <meta property="fb:app_id" content="966242223397117" />
          {/* <meta property="url"  content={`https://textnft.vercel.app/individualnft`} /> */}
          <meta property="description"  content={data?.description}/>
          <meta property="og:description"  content={data?.description} /> 
         {/* <meta property="title" content="Sports NFTs" /> */}
          <meta property="og:title" content={data?.authorName} />
          <meta property="og:site_name" content="Golden Words Nfts" />
          {/* <meta property="og:site_name" content="my_website_name" /> */}
          <meta property="image" content={`${process.env.SERVER_URL}/images/${data?.profile}`} />
          <meta property="og:image"  content={`${process.env.SERVER_URL}/images/${data?.profile}`} />
          <meta property="og:image:type" content="image/*" />
          {/* <meta property="og:image:secure_url" content="https://textnft.vercel.app/new.png" /> */}
          <meta property="og:image:width" content="270" />
          <meta property="og:image:height" content="270" />
          {/* <meta property="image:width" content="467" /> */}
          {/* <meta property="image:height" content="88" /> */}

  {/* twitter */}

          <meta
            property="twitter:url"
            content={`http://localhost:3000/profile/${data._id}`}
          />
          <meta
            property="twitter:description"
            content={data?.description}
            key="og-desc"
          />
          <meta property="twitter:title" 
          content={data?.authorName} />
          <meta
            property="twitter:image"
            itemProp="image"
            content={`${process.env.SERVER_URL}/images/${data?.profile}`}
          />
          {/* <meta name="twitter:card" content="summary_large_image"/> */}
          </>
      )
  }
  
  export default Meta;