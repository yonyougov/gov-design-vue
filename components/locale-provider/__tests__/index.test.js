/* eslint-disable react/no-multi-comp */
import { mount } from '@vue/test-utils';
import Vue from 'vue';
import moment from 'moment';
import MockDate from 'mockdate';
import {
  LocaleProvider,
  Pagination,
  DatePicker,
  TimePicker,
  Calendar,
  Popconfirm,
  Table,
  Modal,
  Select,
  Transfer,
} from '../..';
import arEG from '../ar_EG';
import bgBG from '../bg_BG';
import caES from '../ca_ES';
import csCZ from '../cs_CZ';
import daDK from '../da_DK';
import deDE from '../de_DE';
import elGR from '../el_GR';
import enGB from '../en_GB';
import enUS from '../en_US';
import esES from '../es_ES';
import etEE from '../et_EE';
import faIR from '../fa_IR';
import fiFI from '../fi_FI';
import frBE from '../fr_BE';
import frFR from '../fr_FR';
import heIL from '../he_IL';
import huHU from '../hu_HU';
import isIS from '../is_IS';
import itIT from '../it_IT';
import jaJP from '../ja_JP';
import koKR from '../ko_KR';
import kuIQ from '../ku_IQ';
import mnMN from '../mn_MN';
import nbNO from '../nb_NO';
import neNP from '../ne-NP';
import nlBE from '../nl_BE';
import nlNL from '../nl_NL';
import plPL from '../pl_PL';
import ptBR from '../pt_BR';
import ptPT from '../pt_PT';
import ruRU from '../ru_RU';
import skSK from '../sk_SK';
import slSI from '../sl_SI';
import srRS from '../sr_RS';
import svSE from '../sv_SE';
import thTH from '../th_TH';
import trTR from '../tr_TR';
import ukUA from '../uk_UA';
import viVN from '../vi_VN';
import idID from '../id_ID';
import zhCN from '../zh_CN';
import zhTW from '../zh_TW';

const locales = [
  arEG,
  bgBG,
  caES,
  csCZ,
  daDK,
  deDE,
  elGR,
  enGB,
  enUS,
  esES,
  etEE,
  faIR,
  fiFI,
  frBE,
  frFR,
  heIL,
  huHU,
  isIS,
  itIT,
  jaJP,
  koKR,
  kuIQ,
  mnMN,
  nbNO,
  neNP,
  nlBE,
  nlNL,
  plPL,
  ptBR,
  ptPT,
  ruRU,
  skSK,
  slSI,
  srRS,
  svSE,
  thTH,
  trTR,
  ukUA,
  viVN,
  idID,
  zhCN,
  zhTW,
];

const { Option } = Select;
const { RangePicker } = DatePicker;

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    filters: [
      {
        text: 'filter1',
        value: 'filter1',
      },
    ],
  },
  {
    title: 'Age',
    dataIndex: 'age',
  },
];

const App = {
  render() {
    return (
      <div>
        <Pagination defaultCurrent={1} total={50} showSizeChanger />
        <Select showSearch style={{ width: '200px' }}>
          <Option value="jack">jack</Option>
          <Option value="lucy">lucy</Option>
        </Select>
        <DatePicker open />
        <TimePicker open defaultOpenValue={moment()} />
        <RangePicker open style={{ width: '200px' }} />
        <Popconfirm title="Question?" visible>
          <a>Click to confirm</a>
        </Popconfirm>
        <Transfer dataSource={[]} showSearch targetKeys={[]} render={item => item.title} />
        <Calendar fullscreen={false} value={moment()} />
        <Table dataSource={[]} columns={columns} />
        <Modal title="Locale Modal" visible>
          <p>Locale Modal</p>
        </Modal>
      </div>
    );
  },
};

describe('Locale Provider', () => {
  beforeAll(() => {
    document.body.innerHTML = '';
    MockDate.set(moment('2017-09-18T03:30:07.795'));
  });

  afterAll(() => {
    MockDate.reset();
  });

  locales.forEach(locale => {
    it(`should display the text as ${locale.locale}`, done => {
      const wrapper = mount(
        {
          render() {
            return (
              <LocaleProvider locale={locale}>
                <App />
              </LocaleProvider>
            );
          },
        },
        { sync: false },
      );
      Vue.nextTick(() => {
        expect(wrapper.html()).toMatchSnapshot();
        done();
      });
    });
  });

  it('should change locale of Modal.xxx', () => {
    const ModalDemo = {
      mounted() {
        Modal.confirm({
          title: 'Hello World!',
        });
      },
      render() {
        return null;
      },
    };
    locales.forEach(locale => {
      mount(
        {
          render() {
            return (
              <LocaleProvider locale={locale}>
                <ModalDemo />
              </LocaleProvider>
            );
          },
        },
        { sync: false },
      );
      const currentConfirmNode = document.querySelectorAll('.gov-modal-confirm')[
        document.querySelectorAll('.gov-modal-confirm').length - 1
      ];
      let cancelButtonText = currentConfirmNode.querySelectorAll(
        '.gov-btn:not(.gov-btn-primary) span',
      )[0].innerHTML;
      let okButtonText = currentConfirmNode.querySelectorAll('.gov-btn-primary span')[0].innerHTML;
      if (locale.locale === 'zh-cn') {
        cancelButtonText = cancelButtonText.replace(' ', '');
        okButtonText = okButtonText.replace(' ', '');
      }
      expect(cancelButtonText).toBe(locale.Modal.cancelText);
      expect(okButtonText).toBe(locale.Modal.okText);
    });
  });

  it('set moment locale when locale changes', done => {
    document.body.innerHTML = '';
    const Test = {
      data() {
        return {
          locale: zhCN,
        };
      },
      render() {
        return (
          <LocaleProvider locale={this.locale}>
            <div>
              <DatePicker defaultValue={moment()} open />
            </div>
          </LocaleProvider>
        );
      },
    };
    const wrapper = mount(Test, { sync: false, attachToDocument: true });
    setTimeout(() => {
      expect(document.body.innerHTML).toMatchSnapshot();
      wrapper.setData({ locale: frFR });
      setTimeout(() => {
        expect(document.body.innerHTML).toMatchSnapshot();
        wrapper.setData({ locale: null });
        setTimeout(() => {
          expect(document.body.innerHTML).toMatchSnapshot();
          done();
        });
      });
    });
  });
});
