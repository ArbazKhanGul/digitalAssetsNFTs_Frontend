import Head from 'next/head'
import Navbar from '../components/navbar'
import  Main from '../components/mainpage'
import TopCollections from '../components/mainpage/topcollections'
import Work from '../components/mainpage/work'
import NFTPortion from "../components/mainpage/nftportion"
import Footer from '../components/footer/footer'
export default function Home() {
  return (
    <div >
      <Head>
        <title>Create Next App</title>
        <meta name="viewport" content="width=device-width,initial-scale=1"></meta>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>


<Navbar></Navbar>
<Main></Main>   
<TopCollections></TopCollections>
<Work></Work>
<NFTPortion></NFTPortion>
<Footer></Footer>
    </div>
  )
}
