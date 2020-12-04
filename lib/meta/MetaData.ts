import {
  MetaPropertyCharset,
  MetaPropertyEquiv,
  MetaPropertyMicrodata,
  MetaPropertyName,
  MetaPropertyProperty
} from 'vue-meta/types/vue-meta';

export type MetaData = (
  | MetaPropertyCharset
  | MetaPropertyEquiv
  | MetaPropertyName
  | MetaPropertyMicrodata
  | MetaPropertyProperty
)[];
