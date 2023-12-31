import type { LangTime } from '@/utils/lang/interface';

/** 韩语 */
const ko = {
    title: '전염병 발생 상황 가시화',
    header: {
        search: {
            placeholder: '지역별 약칭, 시 / 도별 데이터 검색',
            emptyTip: '해당 키워드에 해당하는 지역 데이터가 없습니다',
            loading: (c: number) => `데이터를 로드하는 중입니다. 잠시 후 (${c}/3)......`
        },
        menus: {
            title: '시각화 메뉴',
            signature: {
                title: '종목 소개',
                technology: {
                    frontEnd: '프런트엔드',
                    api: 'Http Api 인터페이스',
                    backEnd: '백엔드'
                },
                feature: {
                    title: '이 항목의 일부 기능',
                    content: [
                        [
                            '지역 데이터 검색',
                            '프로젝트에서 지역 데이터를 검색하는 기능을 개발하였는데, 이 지역은 성급 단위일 수도 있고, 시급 단위일 수도 있으며, 검색 기능은 모호한 일치와 정확한 일치를 동시에 고려한다'
                        ],
                        [
                            '테마 전환',
                            '서로 다른 사용 장면에 더욱 잘 적응할 수 있도록 테마 전환 기능이 생겨났다.항목에는 연한 색상 테마 5세트, 어두운 색상 테마 4세트가 제공됩니다.이와 동시에 웹사이트도 옅은 색과 짙은 색에서 자동적으로 시스템주제를 따라 전환할수 있도록 지원한다'
                        ],
                        [
                            '국제화',
                            '현재 많은 제품들이 국제화 기능을 지원하는데 이렇게 하면 프로젝트의 가용성과 사용자 체험을 크게 향상시킬 수 있다.그러나 국제화의 실현 방안은 여러 가지가 있다. 이 프로젝트에서 이 기능은 제3자 플러그인을 이용하여 실현되지 않고 그 원리에 따라 스스로 실현된 것이다. 구체적인 실현 방식은 대응하는 GitHub에서 볼 수 있다'
                        ],
                        [
                            '고덕 지도',
                            '프로젝트는 @ vuemap/vue-amap 라이브러리를 빌어 고덕지도에 대한 통합을 실현하였으며 동시에 수요에 따라 로드하였다.현재 지도의 확대 / 축소, 초점이동, 위치 지정 및 행정구역에 협조하여 각 성의 전염병 데이터 구분을 지원하고 있다'
                        ],
                        [
                            '포지셔닝 기능',
                            '브라우저의 위치 확인 기능을 호출하여 사용자의 지리적 위치 정보를 얻고 현재 위치를 지도에 표시하는 동시에 현재 위치의 전염병 데이터도 동시에 보여준다'
                        ],
                        [
                            '데이터 프레젠테이션',
                            '에서는 데이터를 교체할 때 애니메이션 전환과 글로벌 메시지 프롬프트가 표시되는 지역 패널과 데이터 패널을 제공합니다.그러나 인터페이스 제한으로 인해 현재 국가, 성급, 시급의 전염병 발생 상황 데이터만 제공할 수 있으며, 현, 진, 거리 등은 잠시 지원하지 않는다'
                        ],
                        [
                            'Echarts',
                            'Echarts의 온디맨드 로드 기능을 통해 프로젝트는 원통형 그래프와 파이 그래프의 차트 표시 방식을 제공하고 게으른 로드를 실현합니다.'
                        ]
                    ]
                },
                comments: {
                    title: '부록',
                    content: {
                        api: '이 프로젝트의 인터페이스 호스팅 문서 Apifox',
                        git: '앞뒤 GitHub 주소'
                    }
                }
            },
            i18n: {
                title: '국제화하다',
                globalMsg: {
                    success: {
                        title: '작업 성공',
                        content: '현재 보여 드리는 언어는 한국어입니다'
                    },
                    warn: {
                        title: '작업 실패',
                        content: '현재 제시된 언어는 한국어입니다'
                    }
                },
                text1: '현재 시각화 플랫폼은 국제화를 지원합니다. 아래 언어를 제공해 드립니다',
                text2: '고덕지도 js api2.0 이상은 중국어 간체자만을 지원하므로 프로젝트에서 다루는 지도 텍스트 부분은 국제화되지 않는다',
                text3: '국제화 구성은 기본적으로 기본 설정에 포함됩니다.예를 들어 이번에\'중국어 간체\'를 전시 언어로 선택했다면 다음에 이 사이트에 들어갈 때\'중국어 간체\'로 계속 전시할 것이다'
            },
            style: {
                title: '테마 양식',
                globalMsg: {
                    success: {
                        title: '테마 업데이트됨',
                        content: '사용자 정의 테마 배열이 적용되었습니다'
                    },
                    warn: {
                        title: '업데이트 실패',
                        content: '선택한 주제가 적용되고 있습니다'
                    }
                },
                text1: '여기에서 원하는 테마 스타일이나 프로젝트를 선택할 수 있습니다',
                text2: '최대 9개의 사용자 정의 테마 배열을 마음대로 선택할 수 있습니다.연색 계열과 짙은 색 계열에 따라 분류하면, 연색 계열 주제가 5세트이고, 짙은 색 계열 주제가 4세트이다',
                text3: '또한 웹 사이트는 시스템과 함께 어두운 모드를 켜거나 끕니다.기본 시나리오에서는 밝은 색상 모드를 표준 항목으로, 어두운 색상 모드를 팬텀 블랙 항목으로 자동 전환합니다.',
                scheme: [
                    '기준',
                    '마카롱',
                    '먼산다이',
                    '환상 흑',
                    '풀빛이 푸르다',
                    '하이 나이트 블루',
                    '인디고',
                    '달빛 은빛',
                    '고풍스러운 흙'
                ]
            },
            btn1: '닫다'
        }
    },
    body: {
        ncov: {
            details: {
                text1: '현재 지역',
                text2: '데이터의 마지막 갱신 시간',
                text3: '전국'
            },
            data: {
                text1: '누적 확진자수',
                text2: '감염 의심 인원 수',
                text3: '완치 인원수',
                text4: '사망자 수'
            }
        },
        amap: {
            location: {
                globalMsg: {
                    success: {
                        title: '위치 확인 성공',
                        content: '지리적 위치 '
                    },
                    warn: {
                        title: '위치 탐색 실패',
                        content:
                            '이 위치추적 실패는 브라우저 위치추적 권한, 시스템 위치추적 권한, 네트워크 등과 관련이 있습니다. 나중에 다시 시도하십시오'
                    }
                }
            },
            resetPos: {
                tip: '지도 크기 조정 재설정',
                globalMsg: {
                    success: {
                        title: '성공적으로 초기화되었습니다',
                        content: '현재 지도의 중심 위치와 확대/축소 설정이 초기화되었습니다'
                    },
                    warn: {
                        title: '초기화 실패',
                        content: '현재 지도의 중심 위치와 확대/축소 크기는 이미 기본 설정입니다'
                    }
                }
            },
            showPanelData: {
                globalMsg: {
                    success: {
                        title: '데이터 교체 성공',
                        content: (s: string) => `이미 왼쪽 데이터 패널에 ${s}에 관한 전염병 발생 상황 데이터를 전시했다`
                    },
                    warn: {
                        title: '데이터 교체 실패',
                        content: (s: string) => `데이터 패널이 현재 보여주고 있는 전염병 데이터는 이미 ${s}이다`
                    }
                }
            },
            toolBar: {
                add: '확대',
                sub: '축소'
            }
        },
        page: {
            update_time: ({ year, month, day }: LangTime) =>
                `전국적으로, 2019년 12월 08일 후베이성 우한시에서 첫 코로나바이러스 폐렴이 보고된 이래, ${year}년 ${month}월 ${day}일까지 누계로 보고되었다`,
            confirmed_count: (c: number) => `확진환자는 ${c}명이다`,
            suspected_count: (c: number) => `감염 의심자 ${c}명`,
            cured_count: (c: number) => `${c}명의 환자가 완치되었다`,
            dead_count: (c: number) => `${c}명이 사망했다`
        },
        echarts: {
            title: {
                text1: '성급 행정구',
                text2: '직할시',
                text3: '자치구',
                text4: '특별행정구와 대만성'
            }
        }
    }
};
export default ko;
