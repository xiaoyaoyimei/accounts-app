import React from "react";
import { BrowserRouter as Router, Route, Link ,Switch} from "react-router-dom";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import Vip from './Vip'
import About from './About.js'
import 'antd/dist/antd.css'
import {Layout, Menu, Breadcrumb, Icon,} from 'antd';
const {
  Header, Content, Footer, Sider,
} = Layout;
const SubMenu = Menu.SubMenu;

function NoMatch({ location }) {
  return (
    <div>
      <h3>
       暂无当前目录<code>{location.pathname}</code>
      </h3>
    </div>
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
	render(){
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
		        <Link to="/vip"><Icon type="pie-chart" />
		        <span>图标</span>
						</Link>
		      </Menu.Item>
		      <Menu.Item key="9">
					<Link to="/about">
		        <Icon type="file" />
		        <span>表单</span>
						</Link>
		      </Menu.Item>
					   <SubMenu
					  key="sub1"
					  title={<span><Icon type="user" /><span>User</span></span>}
					>
					 
					  <Menu.Item key="4"><Link to="/chils">个人信息</Link></Menu.Item>
					  <Menu.Item key="5"><Link to="/user/update">修改密码</Link></Menu.Item>
					</SubMenu>
		    </Menu>
		  </Sider>
		  <Layout>
		    <Header style={{ background: '#fff', padding: 0 }} />
		    <Content style={{ margin: '0 16px' }}>
		      <Breadcrumb style={{ margin: '16px 0' }}>
		        <Breadcrumb.Item>User</Breadcrumb.Item>
		        <Breadcrumb.Item>Bill</Breadcrumb.Item>
		      </Breadcrumb>
		      <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
					  <TransitionGroup>
                {/* no different than other usage of
                CSSTransition, just make sure to pass
                `location` to `Switch` so it can match
                the old location as it animates out
            */}
                <CSSTransition

                  classNames="fade"
                  timeout={300}
                >
					<Switch>
		       <Route exact path="/" component={Vip} />
        <Route path="/about" component={About} />
        <Route path="/vip" component={Vip} />
				<Route path="/:user" component={User} />
				<Route component={NoMatch} />
				</Switch>
				</CSSTransition>
				</TransitionGroup>
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
function User({ match }) {
	console.log({match})
  return (
    <div>
      <h2>User: {match.params.user}</h2>
    </div>
  );
}
export default App;