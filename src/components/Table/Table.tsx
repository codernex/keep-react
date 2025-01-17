import { useState, type ComponentProps, type FC, type PropsWithChildren } from 'react'
import type { keepTableBodyTheme } from './TableBody'
import type { TableContextType } from './TableContext'
import type { keepTableHeadTheme } from './TableHead'
import type { keepTableRowTheme } from './TableRow'
import { TableBody } from './TableBody'
import { keepTableCaptionTheme, TableCaption } from './TableCaption'
import { TableCell } from './TableCell'
import { TableContext } from './TableContext'
import { TableHead } from './TableHead'
import { TableHeadCell } from './TableHeadCell'
import { TableRow } from './TableRow'
import { DeepPartial } from '../../helpers/deep-partial'
import { useTheme } from '../../Keep/ThemeContext'
import { cn } from '../../helpers/cn'

export interface keepTableTheme {
  root: keepTableRootTheme
  head: keepTableHeadTheme
  row: keepTableRowTheme
  body: keepTableBodyTheme
  caption: keepTableCaptionTheme
}
export interface keepTableRootTheme {
  base: string
  shadow: string
  wrapper: string
}
/**
 * Props for the Table component.
 * @interface TableProps
 * @extends {PropsWithChildren<ComponentProps<'table'>>}
 * @extends {TableContextType}
 */
export interface TableProps extends PropsWithChildren, ComponentProps<'table'>, TableContextType {
  /**
   * The theme for the table.
   * @type {DeepPartial<keepTableTheme>}
   * @default {theme.table}
   */
  theme?: DeepPartial<keepTableTheme>

  /**
   * Determines whether to show checkboxes in the table.
   * @type {boolean}
   * @default false
   */
  showCheckbox?: boolean

  /**
   * Determines whether to show borders in the table.
   * @type {boolean}
   * @default false
   */
  showBorder?: boolean

  /**
   * The position of the border in the table.
   * @type {'left' | 'right'}
   * @default 'right'
   */
  showBorderPosition?: 'left' | 'right'

  /**
   * Determines whether the table is checked.
   * @type {boolean}
   * @default false
   */
  checked?: boolean

  /**
   * Additional CSS class for the table.
   * @type {string}
   * @default ''
   */
  className?: string
}

const TableComponent: FC<TableProps> = ({
  children,
  className,
  hoverable,
  striped,
  showCheckbox = false,
  showBorder = false,
  showBorderPosition = 'right',
  checked,
  ...props
}) => {
  const theme = useTheme().theme.table

  const [isChecked, setIsChecked] = useState(false)

  const handleCheckbox = (value: boolean) => {
    setIsChecked(value)
  }

  return (
    <div id="tableScrollBar" className="w-full overflow-x-auto rounded-lg">
      <div data-testid="table-element" className={cn(theme.root.wrapper)}>
        <TableContext.Provider
          value={{
            striped,
            hoverable,
            showCheckbox,
            showBorder,
            showBorderPosition,
            checked: isChecked,
            handleCheckbox: handleCheckbox,
          }}>
          <table className={cn(theme.root.base, className)} {...props}>
            {children}
          </table>
        </TableContext.Provider>
      </div>
    </div>
  )
}

TableComponent.displayName = 'Table'
TableHead.displayName = 'Table.Head'
TableBody.displayName = 'Table.Body'
TableRow.displayName = 'Table.Row'
TableCell.displayName = 'Table.Cell'
TableHeadCell.displayName = 'Table.HeadCell'
TableCaption.displayName = 'Table.Caption'

export const Table = Object.assign(TableComponent, {
  Head: TableHead,
  Body: TableBody,
  Row: TableRow,
  Cell: TableCell,
  HeadCell: TableHeadCell,
  Caption: TableCaption,
})
