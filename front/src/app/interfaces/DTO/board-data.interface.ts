
export interface BoardData {
  groups: Group[]
  columns: Column[]
}

export interface Group {
  id: string
  title: string
  color: string
  items_page: ItemsPage
}

export interface ItemsPage {
  cursor: any
  items: Item[]
}

export interface Item {
  id: string
  name: string
  column_values: ColumnValue[]
}

export interface ColumnValue {
  id: string
  text?: string
  type: string
  value?: string
}

export interface Column {
  id: string
  type: string
  title: string
  settings: Settings
}

export interface Settings {
  labels?: Label[]
  limit_select?: boolean,
  label_limit_count?: number,
  allowCreateReflectionColumn?: boolean
  boardIds?: number[]
}

export interface Label {
  id: number
  color: number
  label: string
  index: number
  is_done: boolean
  is_deactivated: boolean
  hex: string
}
