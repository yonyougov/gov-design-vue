// Project: https://github.com/vueComponent/ant-design-vue
// Definitions by: akki-jat <https://github.com/akki-jat>
// Definitions: https://github.com/vueComponent/ant-design-vue/types

import { GovdComponent } from '../component';
import { CollapsePanel } from './collapse-panel';

export declare class Collapse extends GovdComponent {
  static Panel: typeof CollapsePanel;

  /**
   * If true, Collapse renders as Accordion
   * @default false
   * @type boolean
   */
  accordion: boolean;

  /**
   * Key of the active panel
   * @default No default value. In accordion mode, it's the key of the first panel.
   * @type string | string[]
   */
  activeKey: string | string[];

  /**
   * Toggles rendering of the border around the collapse block
   * @default true
   * @type boolean
   */
  bordered: boolean;

  /**
   * Key of the initial active panel
   * @type string
   */
  defaultActiveKey: string | string[];

  /**
   * Destroy Inactive Panel
   * @default false
   * @type boolean
   */
  destroyInactivePanel: boolean;
}
