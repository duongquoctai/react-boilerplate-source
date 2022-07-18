// ----------------------------------------------------------------------

function path(root, sublink) {
  return `${root}${sublink}`;
}

const ROOTS = {
  auth: '/auth',
  app: '/app',
  docs: '/docs'
};

export const PATH_PAGE = {
  auth: {
    root: ROOTS.auth,
    login: path(ROOTS.auth, '/login'),
    loginUnprotected: path(ROOTS.auth, '/login-unprotected'),
    register: path(ROOTS.auth, '/register'),
    registerUnprotected: path(ROOTS.auth, '/register-unprotected'),
    resetPassword: path(ROOTS.auth, '/reset-password'),
    verify: path(ROOTS.auth, '/verify')
  },
  comingSoon: '/coming-soon',
  maintenance: '/maintenance',
  pricing: '/pricing',
  payment: '/payment'
};

export const PATH_APP = {
  root: ROOTS.app,
  main: {
    root: path(ROOTS.app, '/dashboard'),
    dashboard: path(ROOTS.app, '/dashboard'),
    overview: path(ROOTS.app, '/dashboard/overview'),
    profile: path(ROOTS.app, '/profile')
  },
  project: {
    root: path(ROOTS.app, '/projects'),
    scenario: {
      root: path(ROOTS.app, '/projects/:projectId/scenarios'),
      model: path(
        ROOTS.app,
        '/projects/:projectId/scenarios/:scenarioId/model'
      ),
      postProcessing: path(
        ROOTS.app,
        '/projects/:projectId/scenarios/:scenarioId/post-processing'
      ),
      schedule: path(
        ROOTS.app,
        '/projects/:projectId/scenarios/:scenarioId/schedule'
      )
    },
    dataset: {
      root: path(ROOTS.app, '/projects/:projectId/datasets'),
      new: path(ROOTS.app, '/projects/:projectId/datasets/new'),
      sql: path(ROOTS.app, '/projects/:projectId/datasets/new/sql'),
      upload: path(ROOTS.app, '/projects/:projectId/datasets/new/upload')
    },
    job: {
      root: path(ROOTS.app, '/projects/:projectId/jobs')
    },
    detail: path(ROOTS.app, '/projects/:projectId')
  },
  app: {
    mail: {
      root: path(ROOTS.app, '/mail'),
      all: path(ROOTS.app, '/mail/all'),
      labels: [
        path(ROOTS.app, '/mail/label/:customLabel/:mailId?'),
        path(ROOTS.app, '/mail/:systemLabel/:mailId?')
      ]
    },
    chat: {
      root: path(ROOTS.app, '/chat'),
      new: path(ROOTS.app, '/chat/new'),
      conversation: [
        path(ROOTS.app, '/chat/new'),
        path(ROOTS.app, '/chat/:conversationKey')
      ]
    },
    calendar: path(ROOTS.app, '/calendar')
  }
};

export const PATH_DOCS = {
  root: ROOTS.docs
};
