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



export const filterTransactionSchema=Yup.object({
  nftName:Yup.string().trim().min(2,"Minimum character should be 2").max(25,"Maximum character should be 25"),
  nftType:Yup.object(),
  transactionType:Yup.object(),
  OwnerName:Yup.string().trim(),
  Buyer:Yup.string().trim(),
  minimumPrice: Yup.number().min(0,"you must specify price greater than or equal to 0").typeError('you mustr specify price greater than or equal to 0'),
  maximumPrice: Yup.number().min(0,"you must specify price greater than or equal to 0").typeError('you must specify price greater than or equal to 0'),
  tokenId: Yup.number().moreThan(0,"you must specify id greater than 0").typeError('you must specify id greater than 0'),
})


const FILE_SIZE_MEDIA = 500 * 1024 * 1024;
const FILE_SIZE_IMAGE = 10 * 1024 * 1024;

export const NFTCreationSchema=Yup.object().shape({
    nftName:Yup.string().trim().required("Please Enter NFT Name").min(2,"Minimum character should be 2").max(20,"Maximum character should be 20"),
    nftContentType:Yup.string(),
    nftLanguage:Yup.string().trim().when("nftContentType",{
        is: "text", 
        then: Yup.string().required("Please choose NFT language"),
        otherwise:Yup.string()
    }),
    nftDescription:Yup.string().trim().required("Please Enter NFT description").min(10,"Minimum character should be 10").max(250,"Maximum character should be 250"),
    nftText:Yup.string().trim().when("nftContentType",{
        is: "text", 
        then: Yup.string().required("Please Enter NFT Text").min(2,"Minimum character should be 2"),
        otherwise:Yup.string()
    }),
    nftVideo: Yup.mixed().when("nftContentType",{
    is: "video",
    then: Yup.mixed().required('Please select a file').test('fileType', 'Only video files are allowed', (value) => {
        if (!value) {
          return false;
        }
        const allowedTypes = 'video/';
        const { type } = value;
        return type.startsWith(allowedTypes);
      }).test(
          "fileSize",
          "File size must be less than 500MB",
          (value) => {
              if (!value) {
                  return false;
                }
             return value.size <= FILE_SIZE_MEDIA
          }
        ),
    otherwise: Yup.mixed(),
    }) ,
    nftAudio: Yup.mixed().when("nftContentType",{
        is: "audio",
        then: Yup.mixed().required('Please select a file').test('fileType', 'Only audio files are allowed', (value) => {
            if (!value) {
              return false;
            }
            const allowedTypes = 'audio/';
            const { type } = value;
            return type.startsWith(allowedTypes);
          }).test(
              "fileSize",
              "File size must be less than 500MB",
              (value) => {
                  if (!value) {
                      return false;
                    }
                 return value.size <= FILE_SIZE_MEDIA
              }
            ),
        otherwise: Yup.mixed(),
        }) ,
    nftImage: Yup.mixed().when("nftContentType",{
        is: "image",
        then: Yup.mixed().required('Please select a Image').test('fileType', 'Only image files are allowed', (value) => {
            if (!value) {
              return false;
            }
            const allowedTypes = 'image/';
            const { type } = value;
            return type.startsWith(allowedTypes);
          }).test(
              "fileSize",
              "File size must be less than 15MB",
              (value) => {
                  if (!value) {
                      return false;
                    }
                 return value.size <= FILE_SIZE_IMAGE
              }
            ),
        otherwise: Yup.mixed(),
        }),

      
      
})







export const NFTCopySchema=Yup.object().shape({
    // nftName:Yup.string().trim().required("Please Enter NFT Name").min(2,"Minimum character should be 2").max(20,"Maximum character should be 20"),
   
    nftContentUse:Yup.string(),
    nftContentType:Yup.string(),

    nftLanguage:Yup.string().trim().when(["nftContentUse","nftContentType"],{
        is: (field1, field2) => field1 === 'no' && field2 === 'text', 
        then: Yup.string().required("Please choose NFT language"),
        otherwise:Yup.string()
    }),
    nftDescription:Yup.string().when("nftContentUse",{
        is:"no",
        then:Yup.string().trim().required("Please Enter NFT description").min(10,"Minimum character should be 10").max(250,"Maximum character should be 250"),
        otherwise:Yup.string()
        }
    ),
    nftText:Yup.string().trim().when(["nftContentUse","nftContentType"],{
        is: (field1, field2) => field1 === 'no' && field2 === 'text', 
        then: Yup.string().required("Please Enter NFT Text").min(2,"Minimum character should be 2"),
        otherwise:Yup.string()
    }),
    nftVideo: Yup.mixed().when(["nftContentUse","nftContentType"],{
    is: (field1, field2) => field1 === 'no' && field2 === 'video',
    then: Yup.mixed().required('Please select a file').test('fileType', 'Only video files are allowed', (value) => {
        if (!value) {
          return false;
        }
        const allowedTypes = 'video/';
        const { type } = value;
        return type.startsWith(allowedTypes);
      }).test(
          "fileSize",
          "File size must be less than 500MB",
          (value) => {
              if (!value) {
                  return false;
                }
             return value.size <= FILE_SIZE_MEDIA
          }
        ),
    otherwise: Yup.mixed(),
    }) ,
    nftAudio: Yup.mixed().when(["nftContentUse","nftContentType"],{
        is: (field1, field2) => field1 === 'no' && field2 === 'audio',
        then: Yup.mixed().required('Please select a file').test('fileType', 'Only audio files are allowed', (value) => {
            if (!value) {
              return false;
            }
            const allowedTypes = 'audio/';
            const { type } = value;
            return type.startsWith(allowedTypes);
          }).test(
              "fileSize",
              "File size must be less than 500MB",
              (value) => {
                  if (!value) {
                      return false;
                    }
                 return value.size <= FILE_SIZE_MEDIA
              }
            ),
        otherwise: Yup.mixed(),
        }) ,
    nftImage: Yup.mixed().when(["nftContentUse","nftContentType"],{
        is: (field1, field2) => field1 === 'no' && field2 === 'image',
        then: Yup.mixed().required('Please select a Image').test('fileType', 'Only image files are allowed', (value) => {
            if (!value) {
              return false;
            }
            const allowedTypes = 'image/';
            const { type } = value;
            return type.startsWith(allowedTypes);
          }).test(
              "fileSize",
              "File size must be less than 10MB",
              (value) => {
                  if (!value) {
                      return false;
                    }
                 return value.size <= FILE_SIZE_IMAGE
              }
            ),
        otherwise: Yup.mixed(),
        })
})











export const NFTCopyRightSchema=Yup.object({
    nftCurrency:Yup.string().trim().required("Please choose Currency"),
    CopyRightPrice: Yup.number().moreThan(0,"you must specify a positive number").typeError('you must specify a positive number').required("Please enter Copyrights Offered Money"),
})


export const NFTPriceSchema = Yup.object({
  price: Yup.number()
    .required('You must specify a price')
    .min(0, 'Price must be at least 0 BNB')
    .test('maxDecimalPlaces', 'Maximum of four decimal places allowed', (value) => {
      if (value) {
        const decimalPlaces = (value.toString().split('.')[1] || '').length;
        return decimalPlaces <= 4;
      }
      return true;
    })
    .typeError('You must specify a valid number'),
});



export const TokenIDinput= Yup.object({
  tokenId: Yup.number()
    .integer('Please enter an integer')
    .positive('Please enter a positive number')
    .moreThan(0, 'Token ID must be greater than zero')
    .required('Token ID is required'),
});

export const WalletAddressInput= Yup.object({
  walletAddress: Yup.string()
  .min(42,"Invalid Wallet Address")
  .max(42,"Invalid Wallet Address")
    .required('Wallet Address is required'),
});

export const Amount= Yup.object({
  amount: Yup.number().positive('Please enter a positive number')
    .moreThan(0, 'Number must be greater than zero')
    .required('Number is required'),
});

export const BuyCryptoSchema = Yup.object({
  currency: Yup.string().trim().required('Please select currency'),
  amount: Yup.number()
    .required('Please enter amount')
    .typeError('You must specify a positive number')
    .when('currency', (currency, schema) => {
      if (currency === 'bnb') {
        return schema.moreThan(0.001, 'Amount must be greater than 0.001');
      } else if (currency === 'dollar') {
        return schema.min(1, 'Amount must be greater than or equal to 1');
      }
      return schema;
    }),
});




export const FeeUpdateSchema = Yup.object({
  currency: Yup.string().trim().required('Please select currency'),
  amount: Yup.number()
    .required('Please enter amount')
    .typeError('You must specify a positive number')
    .when('currency', (currency, schema) => {
      if (currency === 'bnb') {
        return schema.min(0, 'Amount must be greater than 0');
      } else if (currency === 'dollar') {
        return schema.min(0, 'Amount must be greater than or equal to 0');
      }
      return schema;
    }),
});