import * as Yup from "yup";

export const SignUpSchema=Yup.object({
authorName:Yup.string().trim().required("Please enter author name ").min(2,"Minimum character should be 2").max(25,"Maximum character should be 25"),
email:Yup.string().trim().required("Please enter email address").email("Please enter valid email address"),
description:Yup.string().trim().required("Please enter description ").min(10,"Minimum character should be 10").max(250,"Maximum character should be 250"),
walletAddress:Yup.string().trim().required("Please connect to metamask"),
profile:Yup.string().trim().required("Please select profile image"),
cover:Yup.string().trim().required("Please select Cover image"),

})


export const SendEmailSchema=Yup.object({
    email:Yup.string().trim().required("Please enter email address").email("Please enter valid email address"),

    })


export const UpdateSchema=Yup.object({
        authorName:Yup.string().trim().required("Please enter author name ").min(2,"Minimum character should be 2").max(25,"Maximum character should be 25"),
        description:Yup.string().trim().required("Please enter description ").min(10,"Minimum character should be 10").max(200,"Maximum character should be 200"),
        // profile:Yup.string().trim().required("Please select profile image"),
        // cover:Yup.string().trim().required("Please select Cover image"),

        })

export const filterCollectionSchema=Yup.object({
    authorName:Yup.string().trim().min(2,"Minimum character should be 2").max(25,"Maximum character should be 25"),
    email:Yup.string().trim().email("Please enter valid email address"),
    walletAddress:Yup.string().trim().min(42,"Wallet address should be 42 character long").max(42,"Wallet address should be 42 character long"),
    minimumVolume: Yup.number().moreThan(-0.0000000000001,"you must specify a positive number").typeError('you must specify a positive number'),
    maximumVolume: Yup.number().moreThan(-0.0000000000001,"you must specify a positive number").typeError('you must specify a positive number'),
    minimumFloor: Yup.number().moreThan(-0.00000000000001,"you must specify a positive number").typeError('you must specify a positive number'),
    maximumFloor: Yup.number().moreThan(-0.00000000000001,"you must specify a positive number").typeError('you must specify a positive number'),
})


export const filterNftSchema=Yup.object({
    nftName:Yup.string().trim().min(2,"Minimum character should be 2").max(25,"Maximum character should be 20"),
    ownerEmail:Yup.string().trim().email("Please enter valid email address"),
    creatorEmail:Yup.string().trim().email("Please enter valid email address"),
    ownerWalletAddress:Yup.string().trim().min(42,"Wallet address should be 42 character long").max(42,"Wallet address should be 42 character long"),
    creatorWalletAddress:Yup.string().trim().min(42,"Wallet address should be 42 character long").max(42,"Wallet address should be 42 character long"),
    minimumPrice: Yup.number().moreThan(-0.0000000000001,"you must specify a positive number").typeError('you must specify a positive number'),
    maximumPrice: Yup.number().moreThan(-0.0000000000001,"you must specify a positive number").typeError('you must specify a positive number'),
})


export const NFTCreationSchema=Yup.object({
    nftName:Yup.string().trim().required("Please Enter NFT Name").min(2,"Minimum character should be 2").max(20,"Maximum character should be 20"),
    nftLanguage:Yup.string().trim().required("Please choose NFT language"),
    nftDescription:Yup.string().trim().required("Please Enter NFT description").min(10,"Minimum character should be 10").max(250,"Maximum character should be 250"),
    nftText:Yup.string().trim().required("Please Enter NFT Text").min(2,"Minimum character should be 2")

})

export const NFTSellSchema=Yup.object({
    nftCurrency:Yup.string().trim().required("Please choose NFT language"),
    nftPrice: Yup.number().moreThan(0,"you must specify a positive number").typeError('you must specify a positive number').required("Please enter NFT price"),
})
