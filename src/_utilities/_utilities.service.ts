import { Injectable } from '@nestjs/common';

@Injectable()
export class UtilitiesService {
  handlePopulate(variables: any): { populate: []; filters: {} } {
    const parsedPopulate = variables.populate
      ? variables.populate.split(',')
      : [];
    delete variables.populate;
    return { populate: parsedPopulate, filters: variables };
  }
}
