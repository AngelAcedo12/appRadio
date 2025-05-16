import { RadioBrowserApi } from 'radio-browser-api';
export class RadioBrowserApiCustom extends RadioBrowserApi {
  constructor(appName: string, url: string, hideBroken?: boolean) {
    super(appName, hideBroken);
    this.baseUrl = url;
  }
}
