import { VuexModule, Module, Mutation, Action, getModule } from "vuex-module-decorators";
// import {  getSize, setSidebarStatus, setSize } from "@/utils/cookies";
import store from "@/store";

export enum DeviceType {
  Mobile,
  Desktop
}

export interface AppState {
  device: DeviceType;
  sidebar: {
    opened: boolean;
    withoutAnimation: boolean;
  };
  size: string;
}

@Module({ dynamic: true, store, name: "app" })
class App extends VuexModule implements AppState {
  public sidebar = {
    opened: true,
    withoutAnimation: false
  };

  public device = DeviceType.Desktop;
  public size = "medium";

  // public device = DeviceType.Desktop;
  // public size = getSize() || "medium";

  // @Mutation
  // private TOGGLE_SIDEBAR(withoutAnimation: boolean) {
  //   this.sidebar.opened = !this.sidebar.opened;
  //   this.sidebar.withoutAnimation = withoutAnimation;
  //   if (this.sidebar.opened) {
  //     setSidebarStatus("opened");
  //   } else {
  //     setSidebarStatus("closed");
  //   }
  // }

  // @Mutation
  // private CLOSE_SIDEBAR(withoutAnimation: boolean) {
  //   this.sidebar.opened = false;
  //   this.sidebar.withoutAnimation = withoutAnimation;
  //   setSidebarStatus("closed");
  // }

  // @Mutation
  // private TOGGLE_DEVICE(device: DeviceType) {
  //   this.device = device;
  // }

  // @Mutation
  // private SET_SIZE(size: string) {
  //   this.size = size;
  //   setSize(this.size);
  // }

  // @Action({ rawError: true })
  // public ToggleSideBar(withoutAnimation: boolean) {
  //   this.TOGGLE_SIDEBAR(withoutAnimation);
  // }

  // @Action({ rawError: true })
  // public CloseSideBar(withoutAnimation: boolean) {
  //   this.CLOSE_SIDEBAR(withoutAnimation);
  // }

  // @Action({ rawError: true })
  // public ToggleDevice(device: DeviceType) {
  //   this.TOGGLE_DEVICE(device);
  // }

  // @Action({ rawError: true })
  // public SetSize(size: string) {
  //   this.SET_SIZE(size);
  // }
}

export const AppModule = getModule(App);
