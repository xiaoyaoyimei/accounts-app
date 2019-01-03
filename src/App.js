import React from "react";
import { BrowserRouter as Router, Route, Link,Redirect } from "react-router-dom";
import {
  Layout, Menu, Breadcrumb, Icon,Avatar
} from 'antd';
// 引入Ant-Design样式 & Animate.CSS样式
import 'antd/dist/antd.css'
import 'font-awesome/css/font-awesome.min.css'
import workCenter from './pages/workCenter'
import publicClus from './pages/publicClus'
import privateClus from './pages/privateClus'
import Login from './login'

const {
  Header, Content, Footer, Sider,
} = Layout;
const SubMenu = Menu.SubMenu;
const fakeAuth = {
  isAuthenticated: false,
  authenticate(cb) {
    this.isAuthenticated = true;
    setTimeout(cb, 100); // fake async
  },
  signout(cb) {
    this.isAuthenticated = false;
    setTimeout(cb, 100);
  }
};

const routes = [
	{
		path:"login",
		component:Login
	},
  {
    path: "/workcenter",
    component: workCenter
  },
  {
    path: "/clues/publicClus",
    component: publicClus, 
  },
	{
	  path: "/clues/privateClus",
	  component: privateClus, 
	}
];

// function RouteWithSubRoutes(route) {
//   return (
//     <Route
//       path={route.path}
//       render={props => (
//         // pass the sub-routes down to keep nesting
//         <route.component {...props} routes={route.routes} />
//       )}
//     />
//   );
// }
// class Login extends React.Component {
//   state = { redirectToReferrer: false };
// 
//   login = () => {
//     fakeAuth.authenticate(() => {
//       this.setState({ redirectToReferrer: true });
//     });
//   };
// 
//   render() {
//     let { from } = this.props.location.state || { from: { pathname: "/" } };
//     let { redirectToReferrer } = this.state;
// 
//     if (redirectToReferrer) return <Redirect to={from} />;
// 
//     return (
//       <div>
//         <p>You must log in to view the page at {from.pathname}</p>
//         <button onClick={this.login}>Log in</button>
//       </div>
//     );
//   }
// }

function PrivateRoute({ component: Component, ...rest }) {
  return (
    <Route
      {...rest}
      render={props =>
        fakeAuth.isAuthenticated ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: props.location }
            }}
          />
        )
      }
    />
  );
}
class App extends React.Component {
	  state = {
	  collapsed: false,
	};
	
	onCollapse = (collapsed) => {
	  console.log(collapsed);
	  this.setState({ collapsed });
	}
	render() {
  return (
    <Router>
      <div>
			 <Layout style={{ minHeight: '100vh' }}>
			    <Sider
			      collapsible
			      collapsed={this.state.collapsed}
			      onCollapse={this.onCollapse}
			    >
			      <div className="logo" />
			      <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
			        <Menu.Item key="1">
			         
			          <Link to="/workcenter"> <Icon type="pie-chart" />工作中心</Link>
			        </Menu.Item>
			        <SubMenu
			          key="sub1"
			          title={<span><Icon type="user" /><span>线索管理</span></span>}
			        >
			          <Menu.Item key="3">
							 <Link to="/clues/publicClus">	公有线索</Link></Menu.Item>
			          <Menu.Item key="4">
								 <Link to="/clues/privateClus">私有线索</Link></Menu.Item>
			        </SubMenu>
			      </Menu>
			    </Sider>
			    <Layout>
			      <Header> <Avatar size="large" icon="user" />
						</Header>
			      <Content style={{ margin: '0 16px' }}>
			        <Breadcrumb style={{ margin: '16px 0' }}>
			          <Breadcrumb.Item>User</Breadcrumb.Item>
			          <Breadcrumb.Item>Bill</Breadcrumb.Item>
			        </Breadcrumb>
			        <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
			        {routes.map((route, i) => (
			                 <PrivateRoute key={i} {...route} />
			               ))}
			        </div>
			      </Content>
			      <Footer style={{ textAlign: 'center' }}>
			        Ant Design ©2018 Created by Ant UED
			      </Footer>
			    </Layout>
			  </Layout>


      </div>
    </Router>
  );
	}
}
export default App;