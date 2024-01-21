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

export type Fields = {
  q1: 0;
  q2: 0;
  q3: 0;
  min: 0;
  max: 0;
  avg: 0;
  count: 0;
  std_dev: 0;
  type: string;
  null_count: 0;
  true_count: 0;
  metric: string;
  false_count: 0;
};

type Stats = {
  name: string;
  fields: Fields[];
  timestamp: number;
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
  stats: Stats[];
  data_source_id: string;
};
