/* eslint-disable no-undef */
/* eslint-disable no-unused-expressions */
// eslint-disable-next-line no-unused-expressions
async () => {
  v.style.use('v-main-style', {
    '#v-host *:not(.material-symbols-outlined)': {
      fontFamily: 'Tahoma !important',
    },
    '#v-host .material-symbols-outlined': {
      fontFamily: "'Material Symbols Outlined' !important",
    },
  });
  const breakpoint = 800;
  const screenWidth = Math.min(
    window.innerWidth,
    window.screen.width
  );
  app.settings = {
    breakpoint,
    screenWidth,
    mobile:
      document.documentElement.classList.contains('mobile'),
    navbarPosition:
      screenWidth >= breakpoint
        ? 'top-single'
        : screenWidth < breakpoint
        ? 'top-double'
        : 'left',
    sidebarPosition:
      screenWidth >= breakpoint ? 'left' : 'bottom',
  };
  const setDicomHost = (vHost) => {
    if (vHost) {
      vHost.useStyle('v-app-style', {
        '.rtl': {
          direction: 'rtl',
        },
        '.ltr': {
          direction: 'ltr',
        },
      });
      let primaryColor = vHost.dataset.primaryColor;
      let secondaryColor = vHost.dataset.secondaryColor;
      let instance = vHost.dataset.instance;
      vHost.replaceChildren(
        v.project.dicom.main({
          primaryColor,
          secondaryColor,
          targetElement: vHost,
          instance,
        })
      );
    }
    return vHost;
  };
  setDicomHost(document.getElementById('v-host'));
  document.body.addEventListener(
    'grandchildadd',
    (_, node) => {
      if (node.id === 'v-host') {
        setDicomHost(node);
      }
    }
  );
  if (!window._noServer_)
    document.body.append(
      v.div().Id('v-host').class('vw-100 vh-100')
    );
};
