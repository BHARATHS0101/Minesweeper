declare namespace ReduxNS {
    interface IState {
      Login: LoginNS.IState;
      Register: RegisterNS.IState;
      ManageToken: ManageTokenNS.IState;
      Profile: ProfileNS.IState;
      FuelStations: FuelStationsNS.IState;
    }
  
    interface IThunkFunction<Actions> {
        (
            dispatch: import('react').Dispatch<Actions>,
            getAppState: () => ReduxNS.IState,
        ): void;
    }
  }