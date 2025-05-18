/* eslint-disable no-undef */
/* eslint-disable no-unused-expressions */
// eslint-disable-next-line no-unused-expressions
async () => {
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
      // app.rdv ||= v.project.dicom.index({
      //   primaryColor,
      //   secondaryColor,
      //   targetElement: vHost,
      // });
      vHost.replaceChildren(
        v.project.dicom.index({
          primaryColor,
          secondaryColor,
          targetElement: vHost,
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
};
