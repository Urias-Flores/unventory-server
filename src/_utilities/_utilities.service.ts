import { Injectable } from '@nestjs/common';

@Injectable()
export class UtilitiesService {
  handlePopulate(variables: Record<string, string>): {
    populate: string[];
    filters: Record<string, string>;
  } {
    const parsedPopulate = variables.populate
      ? variables.populate.split(',')
      : [];
    delete variables.populate;
    return { populate: parsedPopulate, filters: variables };
  }
}
