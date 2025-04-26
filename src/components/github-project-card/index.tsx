import { GithubProject } from '../../interfaces/github-project';
import { GoLinkExternal } from 'react-icons/go';
import { FaGithub } from 'react-icons/fa';
import { ga, skeleton } from '../../utils';

const GithubProjectCard = ({
  header,
  githubProjects,
  loading,
  limit,
  username,
  googleAnalyticsId,
}: {
  header: string;
  githubProjects: GithubProject[];
  loading: boolean;
  limit: number;
  username: string;
  googleAnalyticsId?: string;
}) => {
  if (!loading && githubProjects.length === 0) {
    return;
  }

  const renderSkeleton = () => {
    const array = [];
    for (let index = 0; index < limit; index++) {
      array.push(
        <div className="card shadow-lg compact bg-base-100" key={index}>
          <div className="flex justify-between flex-col p-8 h-full w-full">
            <div>
              <div className="flex items-center">
                <span>
                  <h5 className="card-title text-lg">
                    {skeleton({
                      widthCls: 'w-32',
                      heightCls: 'h-8',
                      className: 'mb-1',
                    })}
                  </h5>
                </span>
              </div>
              <div className="mb-5 mt-1">
                {skeleton({
                  widthCls: 'w-full',
                  heightCls: 'h-4',
                  className: 'mb-2',
                })}
                {skeleton({ widthCls: 'w-full', heightCls: 'h-4' })}
              </div>
            </div>
            <div className="flex justify-between">
              <div className="flex flex-grow">
                <span className="mr-3 flex items-center">
                  {skeleton({ widthCls: 'w-12', heightCls: 'h-4' })}
                </span>
                <span className="flex items-center">
                  {skeleton({ widthCls: 'w-12', heightCls: 'h-4' })}
                </span>
              </div>
              <div>
                <span className="flex items-center">
                  {skeleton({ widthCls: 'w-12', heightCls: 'h-4' })}
                </span>
              </div>
            </div>
          </div>
        </div>,
      );
    }

    return array;
  };

  const renderProjects = () => {
    return githubProjects.map((item, index) => (
      <div
        className="card shadow-lg compact bg-base-100 transition-transform duration-300 hover:shadow-2xl hover:-translate-y-2"
        key={index}
      >
        <div className="flex justify-between flex-col p-4 h-full w-full">
          <div>
            <div className="flex items-center justify-between mb-2">
              <div className="card-title text-lg tracking-wide flex text-base-content opacity-60 truncate">
                <span className="truncate">{item.name}</span>
              </div>
              <div className="flex space-x-2">
                <a
                  href={item.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-500 hover:text-black dark:hover:text-white"
                  title="View on GitHub"
                  onClick={() => {
                    if (googleAnalyticsId) {
                      try {
                        ga.event('Click project github', { project: item.name });
                      } catch (error) {}
                    }
                  }}
                >
                  <FaGithub className="w-5 h-5" />
                </a>
                {item.homepage && (
                  <a
                    href={item.homepage}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-500 hover:text-black dark:hover:text-white"
                    title="Visit project homepage"
                    onClick={() => {
                      if (googleAnalyticsId) {
                        try {
                          ga.event('Click project homepage', { project: item.name });
                        } catch (error) {}
                      }
                    }}
                  >
                    <GoLinkExternal className="w-5 h-5" />
                  </a>
                )}
              </div>
            </div>
            <p className="mb-5 mt-1 text-base-content text-opacity-60 text-sm">
              {item.description}
            </p>
          </div>
        </div>
      </div>
    ));
  };

  return (
    <div className="col-span-1 lg:col-span-2">
      <div className="grid grid-cols-2 gap-6">
        <div className="col-span-2">
          <div className="card compact bg-base-100 shadow bg-opacity-40">
            <div className="card-body">
              <div className="mx-3 flex items-center justify-between mb-2">
                <h5 className="card-title">
                  {loading ? (
                    skeleton({ widthCls: 'w-40', heightCls: 'h-8' })
                  ) : (
                    <span className="text-base-content opacity-70">
                      {header}
                    </span>
                  )}
                </h5>
                {loading ? (
                  skeleton({ widthCls: 'w-10', heightCls: 'h-5' })
                ) : (
                  <a
                    href={`https://github.com/${username}?tab=repositories`}
                    target="_blank"
                    rel="noreferrer"
                    className="text-base-content opacity-50 hover:underline"
                  >
                    See All
                  </a>
                )}
              </div>
              <div className="col-span-2">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {loading ? renderSkeleton() : renderProjects()}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GithubProjectCard;
