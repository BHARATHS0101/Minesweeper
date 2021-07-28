declare namespace ReduxNS {
    interface IState {
      App: AppNS.IState
    }
  
    interface IThunkFunction<Actions> {
        (
            dispatch: import('react').Dispatch<Actions>,
            getAppState: () => ReduxNS.IState,
        ): void;
    }
  }