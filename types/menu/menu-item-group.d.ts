// Project: https://github.com/vueComponent/ant-design-vue
// Definitions by: akki-jat <https://github.com/akki-jat>
// Definitions: https://github.com/vueComponent/ant-design-vue/types

import { GovdComponent } from '../component';
import { MenuItem } from './menu-item';

export declare class MenuItemGroup extends GovdComponent {
  /**
   * sub menu items
   * @type MenuItem[]
   */
  children: MenuItem[];

  /**
   * title of the group
   * @type string | slot
   */
  title: any;
}
