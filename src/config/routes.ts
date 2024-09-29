interface PathParams {
  queries?: Record<string, string>;
}

class ProtoRouterPath {
  readonly path: string = '';

  getPath({ queries }: PathParams) {
    let newPath = this.path;
    if (queries) {
      newPath += `?${new URLSearchParams(queries).toString()}`;
    }
    return newPath;
  }
}
class RouterPath extends ProtoRouterPath {
  readonly path: string = '';
  constructor(path: string) {
    super();
    this.path = path;
  }
}

// /myapp/ - is privet route
export const rootPage = new RouterPath('/');
export const loginPage = new RouterPath('/login');
export const initProfilePage = new RouterPath('/myapp/init-profile');
export const addNewPhrasePage = new RouterPath('/myapp/add-word');
export const dictionaryPage = new RouterPath('/myapp/dictionary');
export const learningPage = new RouterPath('/myapp/learning');
