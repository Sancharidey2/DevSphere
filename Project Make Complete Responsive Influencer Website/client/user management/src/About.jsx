import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/material';
import SearchAppBar from './navbar';
export default function Aboutcard() {
  return (
    <>
    <SearchAppBar/>
    <Box sx={{display:'flex',justifyContent:'center',alignItems:'center',mt:'30px'}}>
    <Card sx={{ maxWidth: 600}}>
        <div style={{ display:'flex',justifyContent:'center',alignItems:'center'}}>
      <CardMedia
        sx={{ height: 100 , width:100  ,border :'solid black 1px' , borderRadius:'50%' }}
        image="IMG20211130221017.jpg"
        title="green iguana"
      />
      </div>
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          Yash Kumar Yadav
        </Typography>
        <Typography variant="body2" color="text.secondary">
        <p> I have a genuine passion for web development and a strong desire to learn and grow in this field. I have been actively honing my web development skills through self-study, online courses, and personal projects. This internship opportunity will allow me to further enhance my skills and gain practical experience in a professional setting.
I have a solid foundation in web development technologies, including HTML5, CSS3, and JavaScript. I am also familiar with front-end frameworks like React, as well as back-end technologies such as Node.js. I am comfortable working with databases.
This technical knowledge enables me to quickly adapt to new technologies and contribute effectively to web development projects.</p>
<p> I understand the importance of delivering high-quality web applications. I pay meticulous attention to detail, ensuring that my code is clean, efficient, and well-structured.</p>
<Typography gutterBottom variant="h6" component="div">
          Contacts: <br />
          yash.kumaryadav.1610@gmail.com <br/>
          (+91) 9793096936
        </Typography>
        </Typography>
      </CardContent>
      <CardActions>
        <Button href='https://www.linkedin.com/in/yash-yadav-676709237/' size="small">linkedin</Button>
        <Button href='https://github.com/imyky1' size="small">GitHub</Button>
      </CardActions>
    </Card>
    </Box>
    </>
  );
}