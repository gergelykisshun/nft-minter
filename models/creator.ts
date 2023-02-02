import { ISanityImage, ISlug } from "./utility";

export interface ICreator {
  _id: string;
  address: string;
  name: string;
  slug: ISlug;
  image: ISanityImage;
  bio: string;
}
