import {
  communityRepository,
  IcommunityRepository,
} from "./CommunityRepository";
import { CommunityInput } from "../schemas/communitySchema";

class CommunityService {
  constructor(private communityRepository: IcommunityRepository) {}

  async createCommunity(data: CommunityInput, userId: string): Promise<void> {
    const community = await this.communityRepository.create({
      ...data,
      createdBy: userId,
    });
  }
}

export const communityService = new CommunityService(communityRepository);
