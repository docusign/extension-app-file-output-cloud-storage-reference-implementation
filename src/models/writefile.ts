type SpecifiedFile = {
  basename: string;
  contents: string;
  path: string;
};

export interface WriteFileBody {
  files: SpecifiedFile[];
  order?: number;
  overwrite?: boolean;
  parent?: string;
  metadata?: Record<string, unknown>;
}

export interface WriteFileResponse {
  message: string;
}
