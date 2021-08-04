import api from './api';

import { Volumes } from '../libs/volume';

export async function getVolumes(terms: string, startIndex: number) {
  try {
    const response = await api.get(`/volumes?q=${terms}&maxResults=40&startIndex=${startIndex}`);
    return response.data as Volumes;
  } catch (err) {
    throw new Error(err)
  }
}