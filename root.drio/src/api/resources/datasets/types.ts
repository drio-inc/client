type Config = {
  "segment.bytes"?: number;
  "cleanup.policy"?: string;
};

type TopicDetails = {
  name: string;
  configs?: Config;
  partition_count?: number;
  replication_factor?: number;
};

type Properties = {
  additionalProp1: any;
};

type Schema = {
  name: string;
  type: string;
  properties: Properties;
};

type Stats = {
  min: number;
  max: number;
  avg: number;
  type: string;
  metric: string;
  std_dev: number;
};

export type Dataset = {
  topics?: string[];
  data_source_id: string;
  topics_details: TopicDetails[];
};

export type DatasetSchema = {
  schemas: Schema[];
  data_source_id: string;
};

export type SchemaStats = {
  name: string;
  stats: Stats[];
  timestamp: number;
  data_source_id: string;
};
