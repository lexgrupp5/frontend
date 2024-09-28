import { ReactElement, useEffect, useState } from "react";

import { H, P, TextColor } from "@/components";
import { useApi, useCoursePageContext } from "@/hooks";
import { Sidebar } from "./Sidebar";
import { api, type ModuleDto } from "@/api";
import { ModulePanel } from "./ModulePanel";

export const CurrentCoursePage = (): ReactElement => {
  const sidebarWidth = 300;
  const isLargeScreen = window.innerWidth > 768;
  const [sidebarOpen, setSidebarOpen] = useState(isLargeScreen);
  const { selectedCourse } = useCoursePageContext();
  const modulesApi = useApi(api.course);
  const activitiesApi = useApi(api.activities);
  const [modules, setModules] = useState<ModuleDto[]>([]);
  const [openModules, setOpenModules] = useState<Record<string, boolean>>({});

  useEffect(() => {
    (async () => {
      if (selectedCourse?.id == null) { return; }
      const courseModules = await modulesApi.makeAuthRequest(selectedCourse.id);
      if (courseModules == null) { return; }
      updateModuleActivities(courseModules);
      console.log(courseModules);
      setModules(courseModules);
    })();
  }, []);

  const updateModuleActivities = async (courseModules: ModuleDto[]) => {
    courseModules.forEach(async module => {
      if (module.id == null) { return; }
      module.activities = await activitiesApi.makeAuthRequest(module.id) ?? [];
    });
  };

  const updateSidebarOpen = (open: boolean) => {
    setSidebarOpen(open);
  };

  const toggleModuleOpen = (moduleId: number) => {
    setOpenModules(prevState => ({
      ...prevState,
      [moduleId]: !prevState[moduleId]
    }));
  };

  const constructSidebar = () => {
    return (
      <>
        {modules.map(module => {
          if (module.id == null) { return <></>; }
          const id = module.id;
          return <div key={id}>
            <ModulePanel
              module={module}
              open={openModules[module.id]}
              toggleOpen={() => toggleModuleOpen(id)} />
          </div>;
        })}
        <div className="border-t" />
      </>
    );
  };

  if (selectedCourse == null) { return <></>; }

  return (
    <article className="max-h-screen-header bg-indigo-100">
      <Sidebar open={sidebarOpen}
        updateOpen={updateSidebarOpen}
        width={sidebarWidth}>
        {constructSidebar()}
      </Sidebar>
      <div style={{ marginLeft: `${sidebarOpen && isLargeScreen ? 300 : 0}px` }}
        className={"p-16"}>
        <H size={2} color={TextColor.DARK_X}>Use this page to view and update course: '{selectedCourse.name}'</H>
        <br />
        <H size={4} color={TextColor.DARK_X}>{selectedCourse.name}</H>
        <div>
          <P color={TextColor.DARK}>Start: {selectedCourse.startDate?.toDateString()}</P>
          <P color={TextColor.DARK}>End: {selectedCourse.endDate?.toDateString()}</P>
          <br />
          <P color={TextColor.DARK}>{selectedCourse.description}</P>
          <P color={TextColor.DARK}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta nesciunt ad illum architecto, accusamus recusandae labore quos, voluptates exercitationem deleniti aliquid, praesentium cupiditate. Possimus alias maiores ex quas aspernatur ipsum earum, unde dignissimos animi in praesentium id sapiente accusantium numquam sit et ullam voluptas eligendi aliquam, distinctio ducimus soluta? Explicabo beatae perspiciatis numquam deserunt optio sed reiciendis tempore impedit placeat voluptates corrupti odio illo quidem ullam nostrum ducimus, doloremque quis voluptatem? Expedita accusantium consectetur in asperiores ipsam laborum vitae eius esse? Quasi illum cupiditate omnis dicta blanditiis numquam rem at, assumenda distinctio dolore eius modi id obcaecati ipsa praesentium, placeat error quo rerum beatae dolores! Excepturi nostrum officiis reprehenderit facilis soluta non voluptates molestiae a, quia blanditiis corporis nemo quod totam veniam in quae vero eveniet consectetur alias repudiandae dolores error iste. Aliquid quae consectetur aperiam tempore, incidunt modi! Veniam fugit illo sapiente. Repellendus voluptates excepturi veniam quis iure eaque nesciunt a nisi rem, minus quisquam beatae in architecto veritatis laborum molestiae id ipsum, impedit tempore, possimus optio natus at doloribus? Enim, culpa placeat! Beatae repellat soluta amet reprehenderit ab saepe exercitationem voluptatibus, ipsam adipisci quia facere ullam repudiandae voluptatum, facilis iure deserunt, fugiat blanditiis. Quibusdam saepe vel laboriosam voluptatum exercitationem deserunt debitis, illum explicabo voluptate, sint dolores quasi amet! Reiciendis maxime deleniti fugit dignissimos non, at sit quod dolores repellendus earum harum officia magnam necessitatibus corrupti nemo minus voluptates accusamus fugiat, tempora aut facilis eum exercitationem? Odit vel libero accusamus voluptas voluptate dicta, quam dolorum autem repellat ipsum. Deleniti aspernatur consequuntur at quisquam aperiam sint voluptatibus, quis porro, incidunt veniam consectetur. Maxime illum enim hic perferendis, neque repellat delectus dolor distinctio quibusdam deserunt accusantium quo maiores ea pariatur nisi illo obcaecati dolore excepturi omnis cumque earum ex iusto consequuntur corrupti. Accusantium culpa autem nihil quis delectus vitae quaerat, libero pariatur doloribus distinctio debitis deserunt cupiditate architecto voluptate quidem necessitatibus natus perspiciatis at totam dignissimos voluptatibus quia aspernatur ea? Ad ut molestiae exercitationem, possimus dolor neque mollitia quibusdam veritatis. Commodi illo quas voluptates tenetur, porro ut sapiente, aliquam iusto corrupti provident eaque, distinctio saepe eum illum? Rem minus, neque facere, perspiciatis, impedit dolores labore voluptatibus dolorem est aspernatur expedita placeat ab quidem sunt doloribus et beatae eos dolor? Eius, vel ullam. Vero ipsum natus possimus esse saepe corporis aut adipisci reprehenderit mollitia similique provident quis obcaecati, quasi culpa vitae quisquam aspernatur, enim doloribus ab a quae. Nobis asperiores, cumque quasi doloribus quidem libero nihil dignissimos dolores, eum praesentium architecto ut sapiente magni molestiae suscipit temporibus ipsam reprehenderit accusantium a doloremque eligendi! Fugiat, inventore. Unde ex exercitationem molestias nesciunt dicta autem, temporibus dignissimos doloribus maiores rerum. Beatae, vitae tenetur. Vero iure minus accusamus laudantium, autem animi neque quo quibusdam, dolorem minima qui saepe corporis cum odio cupiditate aperiam facere eaque laborum. Animi, sit amet quod blanditiis dolorem incidunt nostrum doloribus excepturi, facere, labore inventore pariatur aperiam dolores. Praesentium in quibusdam culpa odio debitis quo recusandae deserunt dolores, non accusantium eos natus perspiciatis nesciunt sapiente quam ipsum rem labore! Nemo in beatae tempore laudantium? Tenetur adipisci incidunt quos atque quam repellat nulla, saepe, aut facere eum consectetur, iusto ducimus earum placeat! Vel repudiandae perspiciatis aliquid esse atque voluptate quod reiciendis quasi, tempore incidunt! Consequuntur exercitationem explicabo aliquid, quidem repellat incidunt alias, voluptas consectetur voluptatem molestiae ipsum doloribus facilis recusandae ex rem adipisci soluta? Expedita, saepe consequatur, nihil quo exercitationem tenetur quas velit aut quam, praesentium deserunt. Error illum modi velit sed quas quia tenetur libero architecto reprehenderit odio dolorum laborum dicta sit dolorem vel praesentium quam explicabo recusandae, aspernatur voluptas alias doloremque deserunt. Accusantium, veritatis. Cum, reiciendis. Nisi ullam non est dolorem veritatis, molestias minima, porro quaerat libero aspernatur, ipsa quae laborum saepe voluptas nobis veniam earum debitis doloribus ratione cumque! Consequuntur blanditiis at quae inventore ipsa corporis. Saepe voluptas nobis atque minus exercitationem eveniet vel recusandae, perspiciatis error mollitia incidunt dignissimos illum explicabo tempore labore, totam aliquid fugit quis. Quas molestiae quibusdam commodi necessitatibus. Sed natus molestias soluta sequi aut et suscipit? Voluptate exercitationem distinctio obcaecati nulla odio atque voluptatem amet neque beatae, nostrum laudantium impedit, ex culpa in similique voluptas cumque excepturi optio. Quia inventore maiores quae sit pariatur in incidunt libero, quisquam odit, qui, quibusdam consectetur. Doloribus nihil ab temporibus maxime amet veniam ratione pariatur, recusandae corrupti nisi nemo voluptates magni! Ducimus ex culpa, repudiandae iure maxime nobis labore quia, eveniet commodi quis possimus facere soluta sint fugit? Unde saepe, doloribus atque in a vel dolor asperiores. Eius, pariatur natus numquam cumque porro id quasi blanditiis, molestias voluptate nihil placeat ex eveniet. Ipsum odit eius optio, quam quos voluptate doloremque eveniet eaque consequatur? Id nobis illum consequatur, accusantium delectus exercitationem hic consectetur explicabo fuga qui assumenda ratione veritatis neque, necessitatibus voluptate quis quisquam architecto eveniet molestiae aut excepturi quos officia doloremque voluptatum. Assumenda id delectus sunt molestiae repudiandae necessitatibus debitis optio inventore quod, incidunt in minus itaque repellat cum cumque magni facere nam ut tempore voluptas sed distinctio quia! Corporis enim eligendi quas! Quae suscipit a deleniti quam, unde rerum itaque possimus iure officiis. Ab, aut quae praesentium modi in provident aliquid atque! Ducimus est exercitationem sit perspiciatis voluptatem, corrupti animi a? Aperiam necessitatibus officia, inventore, dolorum, ducimus veniam eos ipsum repellendus odio ea esse in reprehenderit at tenetur error ratione. Dolorum obcaecati facilis quos quibusdam, mollitia, inventore delectus iusto praesentium tenetur, provident voluptatum eum suscipit unde ab. Iure veritatis magni reprehenderit, ex modi laudantium provident nihil voluptates hic autem voluptatem molestias numquam, illum, molestiae corporis labore tempora ut delectus quo itaque repudiandae eaque esse ullam? Quidem nam quos placeat, suscipit, maxime, aut aspernatur repellat dignissimos culpa accusamus voluptatum quod officiis corporis sunt modi quasi ipsum corrupti hic id voluptate consequatur. Ex beatae quam ab commodi quis ipsa. Excepturi quos, laboriosam eveniet aliquid ratione quae aliquam voluptates iste sunt, debitis numquam itaque laudantium! Omnis rem ullam culpa, vitae recusandae, placeat fugiat eveniet dolores totam perspiciatis rerum beatae blanditiis numquam a reiciendis possimus quidem. Corrupti amet reprehenderit consequuntur sapiente praesentium at delectus laudantium temporibus nemo obcaecati. Beatae tempora cupiditate vero?</P>
        </div>
      </div>
    </article>
  );
};
