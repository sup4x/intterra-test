export enum SortingDirection {
    DESC = 'DESC',
    ASC = 'ASC'
}

export enum GridColumnType {
    DATE = 'DATE',
    NUMBER ='NUMBER',
    STRING ='STRING'
}

export interface GridColumn<T> {
    label: string
    key: string,
    type: GridColumnType,
    sorting?: boolean
    parseToTypeFunc?: (v: any) => any
}

export interface GridFilter<T> {
    key: string,
    label: string
    isItemAccurate: (item: T) => boolean
}

export interface GridSettings<T> {
    columns: Array<GridColumn<T>>,
    filters: Array<GridFilter<T>>
}
