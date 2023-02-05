import { ICreator } from "./creator";
import { ISanityImage, ISlug } from "./utility";

export interface ICollection {
  _id: string;
  title: string;
  address: string;
  description: string;
  nftCollectionName: string;
  mainImage: ISanityImage;
  previewImage: ISanityImage;
  slug: ISlug;
  creator: ICreator;
  mintable: boolean;
}
