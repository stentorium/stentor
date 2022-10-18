/*! Copyright (c) 2022, XAPP AI */
import { PodcastEpisode } from "../Media";

export interface PodcastSearchService {
    queryOnly: boolean;
    queryPodcastEpisode(podcastIds: string[], q: string): Promise<PodcastEpisode[]>;
    storePodcastEpisode(podcastId: string, episode: PodcastEpisode): Promise<void>;
    loadPodcastEpisode(podcastIds: string[]): Promise<PodcastEpisode[]>;
    removePodcastEpisode(podcastId: string, episode: PodcastEpisode): Promise<void>;
}