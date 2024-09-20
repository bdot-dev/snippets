export default {
    main: {
        title: '비닷크리에이티브',
        url: '/ko/index.html',
    },
    menus: {
        about: {
            title: '소개',
            url: '/ko/about/intro.html',
            depth2: {
                intro: { title: '회사소개', url: '/ko/about/intro.html' },
                directions: { title: '오시는길', url: '/ko/about/directions.html' },
            },
        },
        product: {
            title: '제품',
            url: '/ko/product/productType1.html',
            depth2: {
                productType1: { title: '제품 타입1', url: '/ko/product/productType1.html' },
                productType2: { title: '제품 타입2', url: '/ko/product/productType2.html' },
            },
        },
        esg: {
            title: 'ESG',
            url: '/ko/esg/environment.html',
            depth2: {
                environment: { title: '환경', url: '/ko/esg/environment.html' },
                social: { title: '사회', url: '/ko/esg/social.html' },
                governance: { title: '지배구조', url: '/ko/esg/governance.html' },
            },
        },
        contact: {
            title: '고객지원',
            url: '/ko/contact/inquiry.html',
            depth2: {
                inquiry: { title: '문의하기', url: '/ko/contact/inquiry.html' },
                contactUs: { title: '연락처', url: '/ko/contact/contactUs.html' },
            },
        },
    },
};
